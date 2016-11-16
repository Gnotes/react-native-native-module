//
//  CalendarManager.m
//  iosModule
//
//  Created by hexing on 2016/11/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import "RCTLog.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation CalendarManager

- (NSDictionary *)constantsToExport
{
  return @{ @"YEAR": @"2016" };
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location callback:(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  NSString *message = @"callback message!!!";
  callback(@[[NSNull null], message]);
  
  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
                                               body:@{@"name": @"xing.he"}];}

@end
